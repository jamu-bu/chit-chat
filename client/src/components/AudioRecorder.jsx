import MicRecorder from 'mic-recorder-to-mp3';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const axiosHeader = axios.create({
    baseURL: "https://api.assemblyai.com/v2",
    headers: {
        authorization: import.meta.env.VITE_REACT_APP_ASSEMBLYAI_API_KEY,
        "content-type": "application/json",
        "transfer-encoding": "chunked",
    },
})

const AudioRecorder = ({ newAudioData }) => {

    // Setting up mic recorder + start and stop functions

    const recorder = useRef(null);
    const audioPlayer = useRef(null);
    const [blobURL, setBlobUrl] = useState(null);
    const [audioFile, setAudioFile] = useState(null);
    const [isRecording, setIsRecording] = useState(null);

    useEffect(() => {
        recorder.current = new MicRecorder({ bitRate: 128 })
    }, [])

    const startRecording = () => {
        recorder.current.start().then(() => {
            setIsRecording(true)
        })
    }

    const stopRecording = () => {
        recorder.current
            .stop()
            .getMp3()
            .then(([buffer, blob]) => {
                const file = new File(buffer, "audio.mp3", {
                    type: blob.type,
                    lastModified: Date.now(),
                })
                const newBlobUrl = URL.createObjectURL(blob)
                setBlobUrl(newBlobUrl)
                setIsRecording(false)
                setAudioFile(file)
            })
            .catch((e) => console.log(e))
    }

    // Assembly AI API

    const [uploadURL, setUploadURL] = useState("")
    const [transcriptID, setTranscriptID] = useState("")
    const [transcriptData, setTranscriptData] = useState("")
    const [transcript, setTranscript] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (audioFile) {
            axiosHeader
                .post("/upload", audioFile)
                .then((res) => setUploadURL(res.data.upload_url))
                .catch((err) => console.error(err))
        }
    }, [audioFile])

    // Sending mic recording for transcription

    const submitTranscriptionHandler = () => {

        alert('Voice memo sent for transcription! 😎 Please wait.');

        axiosHeader
            .post("/transcript", {
                audio_url: uploadURL,
            })
            .then((res) => {
                setTranscriptID(res.data.id)

                checkStatusHandler()
            })
            .catch((err) => console.error(err))
    }

    // Checking if transcription is complete

    const checkStatusHandler = async () => {
        setIsLoading(true)
        try {
            await axiosHeader.get(`/transcript/${transcriptID}`).then((res) => {
                setTranscriptData(res.data)
            })
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            console.log(transcriptData);
            if (transcriptData.status !== "completed" && isLoading) {
                checkStatusHandler()
            } else {
                setIsLoading(false)
                setTranscript(transcriptData.text)
                newAudioData(transcriptData.text)
                clearInterval(interval)
            }
        }, 1000)
        return () => clearInterval(interval)
    })

    return (
        <div className="audio-recorder">
                <h5 className="tool-tip">Voice Memo
                    <div className="tool-tip-text">Press start to record, and stop when finished. Then hit submit to send as a message.</div>
                </h5>
                <audio ref={audioPlayer} src={blobURL} controls='controls' />
                <div>
                    <button
                        className='recordBtn'
                        disabled={isRecording}
                        style={isRecording ? { backgroundColor: 'gray' } : {}}
                        onClick={startRecording}
                    >
                        <img id ="editImg"src="../src/assets/play.svg"/>
                    </button>
                    <button
                        className='recordBtn'
                        disabled={!isRecording}
                        style={!isRecording ? { backgroundColor: 'gray' } : {}}
                        onClick={stopRecording}
                    >
                        <img id="editImg" src ="../src/assets/stop.svg"/>
                    </button>
                    <button className='recordBtn' onClick={submitTranscriptionHandler}><img id="editImg" src="../src/assets/mic.svg"/></button>
                </div>
                
            {transcriptData.status === "processing" ? (
                <div>
                    <p>Status: {transcriptData.status}...</p>
                </div>
            ) : null }
            {transcriptData.status === "completed" ? (
                <div>
                    <p>Status: {transcriptData.status}!</p>
                </div>
            ) : null }
        </div>
    )
}

export default AudioRecorder;
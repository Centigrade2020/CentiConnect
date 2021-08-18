import './Chat.css'
import React, { useRef, useState } from 'react'
import 'react-firebase-hooks/auth'
import {useAuthState} from 'react-firebase-hooks/auth'
import {useCollectionData} from 'react-firebase-hooks/firestore'
import fb from "../../services/firebase";


const auth = fb.auth
const firestore = fb.firestore;

const Chat = () => {
    const [user]  = useAuthState(auth)
    const dummy = useRef()
    const messageRef = firestore.collection('messages');
    const query = messageRef.orderBy('createdAt').limit(25);

    const [messages] = useCollectionData(query,{idField:'id'});
    const [formValue,setFormValue] = useState('');

    const sendMessage = async (e) =>{
        e.preventDefault();
        const {uid} = auth.currentUser;

        await messageRef.add({
            text: formValue,
            createdAt: fb.firebase.firestore.FieldValue.serverTimestamp() ,
            uid,
        })
        setFormValue('');
       dummy.current.scrollIntoView({behavior:'smooth'})
    }



    return (
        <>
        <main>
            {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
        
        <span ref={dummy} ></span>
        
        </main>
        <form onSubmit={sendMessage}>
            <input type="text" value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder='Type your message' />
            <button type='submit' id='sendmsg' disabled={!formValue} >send</button>
        </form>
        </>
    )
}

function ChatMessage(props){
    const {text,uid} = props.message;
    const [userProfile,setUserProfile] = useState("");
    let unmounted = false
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

    try{
       fb.storage
        .ref()
        .child(`profileImages/${uid}.jpeg`)
        .getDownloadURL()
        .then((data)=>{
            if(!unmounted){
                setUserProfile(data)
            }else{
                console.log("")
            }
        })
    }catch{
        console.log("")
    }


    return(
        <>
            <div className={`message ${messageClass}`}>
                
                <img id='profilepic' src={userProfile} alt="" />
                <p id='chats'> {text}</p>
             
            </div>
        </>
    )
}

export default Chat

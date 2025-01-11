import React, {useState} from "react";
import axios from "axios";
import './firstPage.css';

const Chatbot = () => {
    const [userQuery, setUserQuery] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [loading, setLoading] = useState(false);


    //Handle the change of the input field
    const handleQueryChange = (e) => {
        setUserQuery(e.target.value);
    };

    //Send the querry to the backend and get a response
    const handleSendQuery = async () => {
        if (!userQuery) return;

        //Add the user's query to the chat history
        setChatHistory([...chatHistory, {sender: 'user', message: userQuery}]);
        setLoading(true);

        try{
            //Send the query to the backend(Express API)
            const response = await axios.post('http://localhost:5000/chat', {
                query: userQuery,
            });

            //Add the bot's response to the chat history
            setChatHistory([
                ...chatHistory,
                {sender: 'user', message: userQuery},
                {sender: 'bot', message:response.data.response},
            ]);
        } catch(error) {
            console.error('Error fetching response',error);
            setChatHistory([
                ...chatHistory,
                {sender: 'user', message: userQuery},
                {sender: 'bot', message: 'Sorry, there was an error. Please try again.'},
            ]);
        }

        //Clear the input field
        setUserQuery('');
        setLoading(false);
    };

    return (
        <div className="chatbot">
            <div className="chat-history">
                {chatHistory.map((chat, index) => (
                    <div key={index} className={chat.sender}>
                        <strong>{chat.sender === 'user' ? 'You: ' : 'Bot: '}</strong>
                        {chat.message}
                    </div>
                ))}
            </div>

            <div className="input-section">
                <input type="text" value={userQuery} onChange={handleQueryChange} placeholder="Ask about computer hardware..." />
                <button onClick={handleSendQuery}> {loading ? 'Thinking...' : 'send'} </button>
            </div>

        </div>
    );
};

export default Chatbot;
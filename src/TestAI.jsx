import React, { useState } from 'react';
import { useValentineContext } from './Context/ValentineContext';
import { toast } from 'react-toastify';

const TestAI = () => {
    const { fetchMessage, setName } = useValentineContext();
    const [prompt, setPrompt] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!prompt) {
            toast.error('Please enter a prompt.');
            return;
        }

        // Set the name or any other context variable if needed
        setName(prompt); // Assuming you want to use the prompt as the name
        fetchMessage(); // Call the fetchMessage function to get the AI response
        setPrompt(''); // Clear the input field
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">Test AI Prompt</h2>
            <form onSubmit={handleSubmit} className="flex flex-col">
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Enter your prompt here..."
                    className="p-2 border border-gray-300 rounded mb-2"
                />
                <button type="submit" className="bg-pink-500 text-white p-2 rounded">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default TestAI; 
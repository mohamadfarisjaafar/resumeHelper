const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

app.post('/review-resume', async (req, res) => {
    const { resume } = req.body;

    if (!resume) {
        return res.status(400).json({ error: 'No resume text provided' });
    }

    // Create a prompt for the Hugging Face model to review the resume
    const prompt = `Review the following resume and provide suggestions for improvement:\n\n${resume}\n\nPlease provide feedback on the grammar, structure, and any suggestions for improvement.`;

    try {
        const response = await fetch('https://api-inference.huggingface.co/models/gpt-3', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer YOUR_HUGGING_FACE_API_KEY`, // Replace with your Hugging Face API key
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                inputs: prompt,
            }),
        });

        const data = await response.json();
        const feedback = data[0].generated_text;

        // Send the feedback back to the frontend
        res.json({ feedback });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error reviewing the resume' });
    }
});

app.listen(port, () => {
    console.log(`Backend server is running at http://localhost:${port}`);
});

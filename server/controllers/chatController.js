const chatController = async (req, res) => {
    const { message, history } = req.body;

    try {
        // Simple Logic for the Chatbot
        // In a real app, you would use OpenAI, Gemini, or another LLM here.
        let reply = "";
        const msg = message.toLowerCase();

        if (msg.includes("hello") || msg.includes("hi")) {
            reply = "Hello! I'm SkyAI, your personal learning assistant. How can I help you today?";
        } else if (msg.includes("course") || msg.includes("learn")) {
            reply = "We have a wide range of premium courses including Full Stack MERN, Spring Boot, and Computer Networks. You can find them in the Courses section!";
        } else if (msg.includes("payment") || msg.includes("price")) {
            reply = "All our courses are priced competitively. We use Stripe for secure payments. You can see the price on each course detail page.";
        } else if (msg.includes("certificate")) {
            reply = "Yes! You receive a premium Certificate of Completion after finishing any of our courses.";
        } else if (msg.includes("who are you")) {
            reply = "I am SkyAI, designed to help you navigate LearnWithSky and answer your technical questions.";
        } else {
            reply = "That's an interesting question! I'm still learning, but I recommend checking our Study Materials section for in-depth knowledge on that topic.";
        }

        // Simulate AI thinking time
        setTimeout(() => {
            res.json({ reply });
        }, 800);

    } catch (error) {
        console.error("Chat Error:", error);
        res.status(500).json({ error: "Failed to get response from SkyAI" });
    }
};

module.exports = { chatController };

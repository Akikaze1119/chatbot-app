async function sendMessage(req, res) {
    const { chatId, content, history } = req.body;
    console.log('chatId', chatId);
    console.log('content', content);
    console.log('history', history);
    return res.json({ chatId, content, history });
    // const sender = 'user';
    // const message = await Message.save({ chatId, content, sender });
    // res.json({ message });
}
export { sendMessage };

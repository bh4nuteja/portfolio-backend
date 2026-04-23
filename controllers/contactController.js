exports.sendMessage = (req, res) => {
  console.log("Message:", req.body);
  res.json({ success: true });
};
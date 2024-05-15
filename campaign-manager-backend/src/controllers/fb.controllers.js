export const getAdAccounts = async (req, res) => {
  try {
    const response = await axios.get(
      `https://graph.facebook.com/v11.0/me/adaccounts?access_token=${req.auth.decoded.access_token}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json(error.response.data);
  }
};

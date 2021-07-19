const stripe = require('stripe')('sk_test_51JAUVODVYZRZlgqTnyc8LtKaXwRYf0f4KgR8eGjrHK7bzBMXCBXE1HrEPrId7yCFsylVM69jD8EHY5arLGEiSkX0004bFiayOp')

const fnStripe = async (req, res) => {
    try {
        const data = await stripe.charges.list()
        return res.status(200).json({ data: data, message: 'OK' })
    } catch (error) {
        return res.status(400).json({ data: null, message: error })
    }
}

module.exports = {
    fnStripe
}
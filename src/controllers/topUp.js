import changeBudgetBy from "../clients/changeBudgetBy.js"

export default async (req, res) => {

    const amount = await changeBudgetBy(req.body.amount)

    res.json(amount)
}

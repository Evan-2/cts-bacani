import prisma from "@/prisma"

export const contact = async (req, res) => {
    const curPage = req.query.page || 1
    const perPage = 5

    try {
        const contacts = await prisma.contact.findMany({
            take: Number(perPage),
            skip: Number(curPage - 1) * perPage,
            orderBy: {
                logAt: "desc"
            }
        })
        const Contacts = await prisma.contact.count()
        return res.status(201).json({
            contacts,
            curPage: curPage,
            maxPage: Math.ceil(Contacts / perPage)
        })
    } catch (error) {
        res.status(500).json({
            ...error
        })
    }
}

export default contact

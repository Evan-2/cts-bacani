import prisma from "@/prisma"

export const trash = async (req, res) => {
    const { id } = req.body

    try {
        const contact = await prisma.contact.delete({
            where: {
                id: id
            }
        })
        return res.status(201).json({ contact })
    } catch (error) {
        res.status(500).json({
            ...error
        })
    }
}

export default trash

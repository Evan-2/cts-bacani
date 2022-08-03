import prisma from "@/prisma"

export const trash = async (req, res) => {
    const { id } = req.body

    try {
        const patient = await prisma.patient.delete({
            where: {
                id: id
            }
        })
        return res.status(201).json({ patient })
    } catch (error) {
        res.status(500).json({
            ...error
        })
    }
}

export default trash

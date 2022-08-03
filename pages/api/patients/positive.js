import prisma from "@/prisma"

export const patients = async (req, res) => {
    try {
        const positive = await prisma.patient.count({
            where: {
                status: "Positive"
            }
        })

        return res.status(201).json({
            positive
        })
    } catch (error) {
        res.status(500).json({
            ...error
        })
    }
}

export default patients

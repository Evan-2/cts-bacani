import prisma from "@/prisma"

export const patients = async (req, res) => {
    try {
        const negative = await prisma.patient.findMany({
            where: {
                status: "Negative"
            }
        })

        return res.status(201).json({
            negative
        })
    } catch (error) {
        res.status(500).json({
            ...error
        })
    }
}

export default patients

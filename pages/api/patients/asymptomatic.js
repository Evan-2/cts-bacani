import prisma from "@/prisma"

export const patients = async (req, res) => {
    try {
        const asymptomatic = await prisma.patient.count({
            where: {
                status: "Asymptomatic"
            }
        })

        return res.status(201).json({
            asymptomatic
        })
    } catch (error) {
        res.status(500).json({
            ...error
        })
    }
}

export default patients

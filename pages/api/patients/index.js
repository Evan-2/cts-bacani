import prisma from "@/prisma"

export const patient = async (req, res) => {
    const curPage = req.query.page || 1
    const perPage = 5

    try {
        const patients = await prisma.patient.findMany({
            take: Number(perPage),
            skip: Number(curPage - 1) * perPage,
            orderBy: {
                logAt: "desc"
            }
        })
        const Patients = await prisma.patient.count()
        return res.status(201).json({
            patients,
            curPage: curPage,
            maxPage: Math.ceil(Patients / perPage)
        })
    } catch (error) {
        res.status(500).json({
            ...error
        })
    }
}

export default patient

import prisma from "@/prisma"

export const create = async (req, res) => {
    const { id, firstName, middleName, lastName, address, gender, birthDate, contact, role, status, note, logAt, supervised } = req.body

    try {
        const patient = await prisma.patient.update({
            where: {
                id: id
            },
            data: {
                firstName,
                middleName,
                lastName,
                address,
                birthDate,
                gender,
                contact,
                role,
                status,
                note,
                logAt,
                supervised
            }
        })
        return res.status(201).json({ patient })
    } catch (error) {
        res.status(500).json({
            ...error
        })
    }
}

export default create

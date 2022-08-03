import prisma from "@/prisma"

export const create = async (req, res) => {
    const { id, firstName, middleName, lastName, address, gender, birthDate, contact, role, note, logAt, supervised } = req.body

    try {
        const request = await prisma.contact.update({
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
                note,
                logAt,
                supervised
            }
        })
        return res.status(201).json({ contact: request })
    } catch (error) {
        res.status(500).json({
            ...error
        })
    }
}

export default create


export class MPatientDtoC{
    patientId: number
    firstName: string
    lastName: string
    age: number
    identityType: string
    identityNumber: string
    contactNumber: number
    isCovidPositive: boolean
    lastModified: string | Date
    admittedOn: string | Date

    constructor(obj?: MPatientDtoC){
        this.patientId = obj && obj.patientId || null
        this.firstName = obj && obj.firstName || ''
        this.lastName = obj && obj.lastName || ''
        this.age = obj && obj.age || null
        this.identityType = obj && obj.identityType || ''
        this.identityNumber = obj && obj.identityNumber || ''
        this.contactNumber = obj && obj.contactNumber || null
        this.isCovidPositive = obj && obj.isCovidPositive || false
        this.lastModified = obj && obj.lastModified || ''
        this.admittedOn = obj && obj.admittedOn || ''
    }
}

export interface ResponseDtoI{
    message: string;
    status: boolean;
}

export class ResponseDtoC{
    message: string
    status: boolean

    constructor(obj?: ResponseDtoC){
        this.message = obj && obj.message || ''
        this.status = obj && obj.status || false
    }
}
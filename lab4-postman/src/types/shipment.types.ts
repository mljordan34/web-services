
export interface CreateShipmentDTO {
    sender: {
        name: string,
        email: string,
        phone: string,
        address: {
            street: string,
            city: string
        }
    },
    recipient: {
        name: string,
        email: string,
        phone: string,
        address: {
            street: string,
            city: string
        }
    },
    package: {
        weight: number,
        dimensions: {
            length: number,
            width: number,
            height: number
        },
        description: string
    },
    options: {
        priority: 'standard' | 'express' | 'overnight',
        signature: boolean,
        insurance: {
            required: boolean,
            value?: number
        },
        fragile: boolean,
        specialInstructions?: string
    }
}
import { useQuery } from '@tanstack/react-query'
import { type PropsTable } from '@/components/Table/Table.type'
import { PREFIX_KEY } from '@/constant/common'
import client from '@/client/index'


type SektorId = {
    nama: string
}


type DataBei = {
    id: Number
    kode_saham: string
    nama: string
    tanggal_listing: string
    sektor_id?: SektorId
}

type GetListBeisResponse = {
    data: DataBei[]
}

export const GetListBeis: PropsTable['dataFetchService'] = params => {
    const queryParams = {
        ...params,
        fields: ['id', 'kode_saham', 'nama', 'sektor_id.nama', 'tanggal_listing',]
    }
    return useQuery({
        queryKey: [PREFIX_KEY.GET, 'BEI', queryParams],
        async queryFn() {
            const response = await client.api.get<GetListBeisResponse>('/items/perusahaan_bei', {
                params: queryParams,
            })
       
            return response.data
        }
    })
}

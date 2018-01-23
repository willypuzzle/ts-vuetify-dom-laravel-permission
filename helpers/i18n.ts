let stripForSelect = (data : Array<any>, locale : string, id = 'id', label = 'label') => {
    if(!data){
        return [];
    }
    return data.map((el) => {
        return {
            [id]: el.id,
            [label]: el.label && el.label[locale] ? el.label[locale] : el.name
        }
    })
}

export {
    stripForSelect
}
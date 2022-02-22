import React from 'react'

export default function CategorySelect({categories}) {
    return (
        <select name='categories' className='form-control'>
            {categories.map(category => (
                <option value={category.id}>{category.name}</option>
            ))}
        </select>
    )
}

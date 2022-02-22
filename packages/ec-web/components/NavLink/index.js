import React from 'react';
import Link from 'next/link';





export default function NavLink( {link, name, name_link} ) {
    if(name!=null){
        return (
            
                <div>
                    <Link href={name_link}>
                    <div className={'link-container padding-more'}>
                    <a className='link'>{name}</a>
                
                    <style jsx>
                    { `
                        .link-container{
                            display: inline-block;
                            margin: 2%;
                            text-align: center;
                            border-radius: 10px;
                            padding: 2%;
                            
                            :hover{
                                background-color: var(--main-color);
                            }
                        }
                        .link-container.padding-more{
                            padding: 5%;
                        }
                        .link{
                            color: var(--main-color);
                            text-decoration: none;
                            font-family: Raleway;
                            font-size: 1rem;
                            font-weight: 800;
                            text-align: center;
                            align-items: center;
                            padding-left: 2%;
                            padding-right: 2%;
                            :hover{
                                color: white;
                                
                            }
                        }
                        
                    `}
                    </style>
                    </div>
                </Link>
                </div>
            )
    }
    return (
        <div className={'link-container ' + (link.name === 'Lifestyle' || link.name === 'Data' ? 'padding-more' : '')} name='contain' key={link.Slug}>
            <Link href={'/categories/' + link.Slug}>
            <a className='link'>{link.name}</a>
            
            </Link>
            <style jsx>
                { `
                    .link-container{
                        display: inline-block;
                        margin: 2%;
                        text-align: center;
                        border-radius: 10px;
                        padding: 2%;
                        
                        :hover{
                            background-color: var(--main-color);
                            color: white
                        }
                    }
                    .link-container.padding-more{
                        padding: 7%;
                        font-weight: 800;
                    }
                    .link{
                        color: var(--main-color);
                        text-decoration: none;
                        font-family: Raleway;
                        font-size: 1rem;
                        font-weight: 800;
                        text-align: center;
                        align-items: center;
                        padding-left: 2%;
                        padding-right: 2%;
                        :hover{
                            color: white;
                        }
                    }
                    
                `}
            </style>
        </div>
    )
}

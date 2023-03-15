import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';
import Image from 'next/image';

const Layout = ({ children, categories }) => {
    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>VTO - Demo website</title>
                <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Lexend&display=swap" rel="stylesheet" />
            </Head>

            <header className='menu'>
            {/* <ul>
                {categoriese.map(category =>(
                    <li key={category.id}>
                    {category.name}
                </li>
                ))}
                
            </ul> */}
                <ul className="nav containers tab">
                    <Link href="/">
                        <li >
                            <div className='logo'>
                                <Image
                                    src="/static/home/logo.png"
                                    width="80"
                                    height="30.9"
                                    alt=""
                                />
                            </div>
                        </li>
                    </Link>
                    <Link href="/brand">
                        <li style={{ marginRight: "80px" }}>Brand</li>
                    </Link>
                    <li className='cate'>Category
                        <ul className='categorys'>
                            {/* <Link href="/category/[id]">
                                <li className='category'>T-Shirt</li>
                            </Link>
                            <Link href="/category/[id]">
                                <li className='category'>Jacket</li>
                            </Link>
                            <Link href="/category/[id]">
                                <li className='category'>Skirt</li>
                            </Link>
                            <Link href="/category/[id]">
                                <li className='category'>Shorts</li>
                            </Link>
                            <Link href="/category/[id]">
                                <li className='category'>Vest</li>
                            </Link> */}
                            {categories.map(category => (
                                <Link href={`/category/${category.id}`} key={category.id}>
                                <li className='category' >{category.name}</li>
                                </Link>
                            ))}

                        </ul>
                    </li>

                </ul>
            </header>
            <main>
                {children}
            </main>
            <footer>
                <div className='img_footer'>
                    <div className='img'>
                    <Image
                        src="/static/home/footer.png"
                        width="1920"
                        height="600"
                        alt=""
                        id='img'
                    />
                    </div>
                <div className='container-footer'>
                    <div className='sub-footer'>
                <div className='logo_footer'>
                    <Image
                        src="/static/home/logo.png"
                        width="120"
                        height="46.3"
                        alt=""
                    />
                </div>
                
                <p className='sd'>Avatar modeling, virtual fitting and sizing solution for bussiness of all sizes</p>
                <form>
                    <input type="text" placeholder='Enter your Email' style={{zIndex:"3"}} />
                    <button>Subscribe</button>
                </form>
                <p id='copyright'>© Copyright VTO. All Rights Reserved</p>
                </div>
                </div>
                </div>
            </footer>
        </>
    )
}


export default Layout
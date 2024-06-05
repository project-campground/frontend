import Image from 'next/image'


import wordmark from '../public/wordmark.svg';
import Logo from '../public/campground-logo.svg'

function Home() {
    return (
        <div>
            <div id='bar'>
                <Image src={Logo} alt="" />
                <span className='actions'>
                    <button className='action'>
                        Sign up
                    </button>
                    <button className='action'>
                        Login
                    </button>
                    <button className='action'>
                        Contact us
                    </button>
                </span>
            </div>
            <div id='main'>
                <Image src={wordmark} alt=""/>
                <h1><span className='green'>100%</span> open-source texting.</h1>
                An open-source texting application for you and your community.
                <br /><br />
                <button className='btn-primary'>Sign up</button><button className='btn-primary'>Login</button>
            </div>
        </div>
    );
};

export default Home;
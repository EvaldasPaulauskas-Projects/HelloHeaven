

import Image from 'next/image';
import NotFoundImg from '../../../../public/imgs/not-found-kuromi.png';


const NotFound = () =>{

    return(
        <div className='w=full h-screen flex items-center justify-center -ml-8 md:ml-[5rem] xl:ml-[15rem] flex-col -mt-[11rem] opacity-45 sniglet-regular'>
            <Image alt="/notFound" src={NotFoundImg} height={350} width={350} />
            <h1 className='capitalize font-semibold'>Nothing has been found.</h1>
        </div>
    );
};

export default NotFound;
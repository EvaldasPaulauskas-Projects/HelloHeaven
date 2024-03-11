import Image from 'next/image';
import LoadingGIf from '../../../../public/imgs/HelloKIttyLoadingGIf.gif';


const Loader = () =>{

    return(
        <div className=' absolute w-full h-screen opacity-55 borderflex items-center justify-center'>
            <Image alt="/loader" src={LoadingGIf} height={350} width={350} className='ml-8 md:ml-10 md:my-14 xl:ml-80' />
        </div>
    );
};

export default Loader;
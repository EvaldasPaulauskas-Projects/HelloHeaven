import Image from 'next/image';
import LoadingGIf from '../../../../public/imgs/HelloKIttyLoadingGIf.gif';


const Loader = () =>{

    return(
        <div className='w=full h-screen flex items-center justify-center flex-col -mt-32 opacity-55'>
            <Image alt="/loader" src={LoadingGIf} height={350} width={350} />
        </div>
    );
};

export default Loader;
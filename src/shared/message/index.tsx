
import info from "../../assets/images/information.svg"
interface IProps{
    msg:string
}
export default function message (props:IProps){
    return(<>
    
    <div className="messageError">
<img src={info}alt=""/>
<p className="text">
            {props.msg}
            </p>
        
        
    </div>
    
    </>)
}
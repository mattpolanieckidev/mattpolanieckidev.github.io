class Pokemon{
    constructor (
        name,
        number,  
        type,
        caught,
        ){
        this.name = name;
        this.number = number;
        this.type = type;
        this.caught = caught;
    }
    toggleCaught(catchStatus){
        this.caught = catchStatus;
    }
}
export default Pokemon;
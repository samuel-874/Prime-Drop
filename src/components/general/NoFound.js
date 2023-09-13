
function NotFound(){
    return (
        <div className="h-[600px] w-[100%] bg-[#F2F2F2] text-center font-commons">
            <h1 className="text-[90px] text-black">Ops!</h1>
            <h4>You entered a wrong url <strong><a href="/">click here</a></strong> to go to home page</h4>
        </div>
    )
}
    export { NotFound as default }
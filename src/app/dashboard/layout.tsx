import { OrderProvider } from "@/providers/order";
import Header from "./components/header";



function DashBoardLayout({children}: {children: React.ReactNode}){
    return (
        <>
        <Header/>
        <OrderProvider>
        {children}
        </OrderProvider>
        </>
    )
}

export default DashBoardLayout;
"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
function HeaderLinks({ name, path }: {
    path: string,
    name: string
}) {
    
    const pathName = usePathname();
    return (
  
        <Link href={path} className={`relative after:bg-foreground ${pathName === path ? 'active' : ''}`}>
           
            {name}
          
        </Link>
     
    
    );
}

export default HeaderLinks

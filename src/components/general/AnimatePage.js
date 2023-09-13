import { motion } from "framer-motion";



const animation = {
    initial: {opacity: 0, x: 100},
    animate:{opacity: 1, x:0},
    exit:{opacity: 0 , x: -100},
}

    function AnimatePage({children}){


        return (
            <motion.div variants={animation} initial='initial' animate='animate' exit='exit' >
            {children}
            </motion.div>
        )
    }

    export { AnimatePage}
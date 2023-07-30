import { ReactNode } from "react"
import { Navbar } from "../../utils/reusableComponents/Navbar/Navbar"
import classes from "./HomeLayout.module.css"
import { Floater } from "../../utils/reusableComponents/Floaters/Floater";

export const HomeLayout: React.FC<{ children: ReactNode }> = ({ children }) => {

    return (
        <Floater>
            <section className={classes.homeLayout}>
                <Navbar />
                <div className={classes.children}>
                    {children}
                </div>
            </section>
        </Floater>
    )
}

// [{ "matNo": "U2017/3030001", "no": 1, "img": "https://u2017-class-photo-album.s3.amazonaws.com/photos/dW5kZWZpbmVkLTY4MDM%3D" }, { "matNo": "U2017/3030003", "no": 3, "img": "https://u2017-class-photo-album.s3.amazonaws.com/photos/dW5kZWZpbmVkLTY4MDM%3D" }, { "matNo": "U2017/3030004", "no": 4, "img": "https://u2017-class-photo-album.s3.amazonaws.com/photos/dW5kZWZpbmVkLTY4MDM%3D" }, { "matNo": "U2017/3030013", "no": 13, "img": "https://u2017-class-photo-album.s3.amazonaws.com/photos/dW5kZWZpbmVkLTY4MDM%3D" }, { "matNo": "U2017/3030014", "no": 14, "img": "https://u2017-class-photo-album.s3.amazonaws.com/photos/dW5kZWZpbmVkLTY4MDM%3D" }, { "matNo": "U2017/3030010", "no": 10, "img": "https://u2017-class-photo-album.s3.amazonaws.com/photos/dW5kZWZpbmVkLTY4MDM%3D" }, { "matNo": "U2017/3030019", "no": 19, "img": "https://u2017-class-photo-album.s3.amazonaws.com/photos/dW5kZWZpbmVkLTY4MDM%3D" }, { "matNo": "U2017/3030031", "no": 31, "img": "https://u2017-class-photo-album.s3.amazonaws.com/photos/dW5kZWZpbmVkLTY4MDM%3D" }, { "matNo": "U2017/3030041", "no": 41, "img": "https://u2017-class-photo-album.s3.amazonaws.com/photos/dW5kZWZpbmVkLTY4MDM%3D" }, { "matNo": "U2017/3030051", "no": 51, "img": "https://u2017-class-photo-album.s3.amazonaws.com/photos/dW5kZWZpbmVkLTY4MDM%3D" }, { "matNo": "U2017/3030011", "no": 11, "img": "https://u2017-class-photo-album.s3.amazonaws.com/photos/dW5kZWZpbmVkLTY4MDM%3D" }, { "matNo": "U2017/3030043", "no": 43, "img": "https://u2017-class-photo-album.s3.amazonaws.com/photos/dW5kZWZpbmVkLTY4MDM%3D" }, { "matNo": "U2017/3030044", "no": 44, "img": "https://u2017-class-photo-album.s3.amazonaws.com/photos/dW5kZWZpbmVkLTY4MDM%3D" }, { "matNo": "U2017/3030054", "no": 54, "img": "https://u2017-class-photo-album.s3.amazonaws.com/photos/dW5kZWZpbmVkLTY4MDM%3D" }, { "matNo": "U2017/3030055", "no": 55, "img": "https://u2017-class-photo-album.s3.amazonaws.com/photos/dW5kZWZpbmVkLTY4MDM%3D" }, { "matNo": "U2017/3030018", "no": 18, "img": "https://u2017-class-photo-album.s3.amazonaws.com/photos/dW5kZWZpbmVkLTY4MDM%3D" }, { "matNo": "U2017/3030032", "no": 32, "img": "https://u2017-class-photo-album.s3.amazonaws.com/photos/dW5kZWZpbmVkLTY4MDM%3D" }, { "matNo": "U2017/30300057", "no": 57, "img": "https://u2017-class-photo-album.s3.amazonaws.com/photos/dW5kZWZpbmVkLTY4MDM%3D" }, { "matNo": "U2017/3030039", "no": 39, "img": "https://u2017-class-photo-album.s3.amazonaws.com/photos/dW5kZWZpbmVkLTY4MDM%3D" }]
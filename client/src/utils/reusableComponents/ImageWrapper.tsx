type ImageWrapperProps = { style?: Record<string, string>, imageLink: string, imageAlt: string, width?: string, height?: string }

export const ImageWrapper: React.FC<ImageWrapperProps> = ({ style, imageLink, imageAlt, width, height }) => {
    return (
        <div style={style}>
            <img src={imageLink} alt={imageAlt} width={width || '100%'} height={height || '100%'} />
        </div>
    )
}
import React from 'react';

const BottomImg = (props) =>
    (
        <div className="bottom">

            <div className="img-container">
                <img className="mui-panel" src={props.flag[props.num]} alt="Country flag"
                    height="300vh;" width="250vw"
                />
            </div>
        </div>
    )



export default BottomImg;

// Import CSS
import "./css/FX.css"
// Import major dependencies
import React, { useEffect, useState } from "react"
// Import components
// Import icons
// Import API and static content

// Ripple FX
/**
 *  Ripple FX component for button clicks.
 *  @param props React properties
 *  @example 
 *  // React component
 *  <FX.Ripple.Component state={state}/>
 *  // Helper methods
 *  FX.Ripple.util.getDefaultState()
 *  FX.Ripple.util.getStartState()
 *  FX.Ripple.util.getStopState()
 */
const Ripple = (props) => {

    const rippleState = props.state
    const [showing, setShowing] = useState(false);
    const timeout = {id: undefined};

    const css = {
        wrapper: {
            height: rippleState.height.toString() + "px",
            width: rippleState.width.toString() + "px"
        },
        rippler: {
            marginLeft: (rippleState.x - 8) + "px",
            marginTop: (rippleState.y - 8) + "px"
        }
    }

    useEffect(() => {
        if(rippleState.show) {
            if(showing) {
                clearTimeout(timeout.id);
                setShowing(false);
                timeout.id = setTimeout(() => {
                    setShowing(true);
                }, 16);
            } else {
                setShowing(true);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rippleState.show])

    return(
        <div className="ripple-wrapper" 
            style={css.wrapper}
        >
            <div 
                className={showing ? "rippler" : ""}
                style={css.rippler}
            />
        </div>
    )

}
/**
 *  Returns the default state object for the Ripple FX.
 *  Helpful for initializing state in parent component.
 *  @param none
 *  @returns {object} Default Ripple state object
 *  @example
 *  // Default state object
 *  {
 *      show: false, 
 *      x: 0, 
 *      y: 0, 
 *      height: 0, 
 *      width: 0
 *  }
 */
const rippleGetDefaultState = () => {
    const defaultState = {
        show: false, 
        x: 0, 
        y: 0, 
        height: 0, 
        width: 0
    }
    return {...defaultState};
}
/**
 *  Returns the appropriate start state object for the Ripple FX.
 *  Intended for use with onMouseDown event.
 *  @param e Event object
 *  @param ref React ref to button
 *  @returns {object} Start Ripple state object
 *  @example
 *  // Start state object
 *  {
 *      show: true, 
 *      x: 32,      // ripple center x (px)
 *      y: 32,      // ripple center y (px)
 *      height: 32, // ripple area height (px)
 *      width: 32   // ripple area width (px)
 *  }
 */
const rippleGetStartState = (e, ref) => {
    const refRect = ref.current.getBoundingClientRect();
    const startState = {
        show: true,
        height: refRect.height,
        width: refRect.width,
        x: e.clientX - refRect.x,
        y: e.clientY - refRect.y
    }
    return {...startState};
}
/**
 *  Returns the appropriate stop state object for the Ripple FX.
 *  Intended for use with onMouseUp event.
 *  @param e Event object
 *  @param ref React ref to button
 *  @returns {object} Stop Ripple state object
 *  @example
 *  // Start state object
 *  {
 *      show: false, 
 *      x: 32,      // ripple center x (px)
 *      y: 32,      // ripple center y (px)
 *      height: 32, // ripple area height (px)
 *      width: 32   // ripple area width (px)
 *  }
 */
const rippleGetStopState = (e, ref) => {
    const stopState = rippleGetDefaultState();
    const refRect = ref.current.getBoundingClientRect();
    stopState.show = false;
    stopState.height = refRect.height;
    stopState.width = refRect.width;
    stopState.x = e.clientX - refRect.x;
    stopState.y = e.clientY - refRect.y;
    return {...stopState};
}

// FX export object
const FX = {
    Ripple: {
        Component: Ripple,
        util: {
            defaultState: rippleGetDefaultState,
            startState: rippleGetStartState,
            stopState: rippleGetStopState
        }
    }
}

export default FX;
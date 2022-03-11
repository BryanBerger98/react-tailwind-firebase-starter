import { useCallback, useEffect, useRef, useState } from "react";
import { Children, cloneElement } from 'react';

function Dropdown({children, id}) {

    const [hiddenDropdown, setHiddenDropdown] = useState(true);

    const dropdownContainer = useRef(null);

    const toggleDropdown = useCallback(() => {
        if (hiddenDropdown) {
            setHiddenDropdown(false);
        } else {
            setHiddenDropdown(true);
        }
    }, [hiddenDropdown]);

    const dismissDropdown = useCallback(() => {
        if (!hiddenDropdown) {
            setHiddenDropdown(true);
        }
    }, [hiddenDropdown]);

    useEffect(() => {
        document.addEventListener('click', (event) => {
          const target = event.target;
          if (!target.closest(`#${id}`) && !hiddenDropdown) {
            dismissDropdown();
          }
        });
    }, [id, dismissDropdown, hiddenDropdown]);

    return(
        <div className="relative dropdown" id={id}>
            {
                Children.map(children, (child, index) => {
                    if (child.type === 'button') {
                        return cloneElement(child, {onClick: toggleDropdown});
                    } else if (child.type === 'ul') {
                        return cloneElement(child, {ref: dropdownContainer, onClick: dismissDropdown, style: {display: hiddenDropdown ? 'none' : 'flex'}});
                    }
                })
            }
        </div>
    );

}
export default Dropdown;
import React, { useState, useEffect } from "react";

const windowInnerPadding = 5;
function Window({
  onTop,
  changeOnTopRunning,
  pid,
  closeRunning,
  startPosition,
  name,
  icon,
  startWidth = 600,
  startHeight = 400,
  minWidth = 280,
  minHeight = 100,
  zIndex,
  Component,
  programProps,
}) {
  const largerThanScreen =
    startWidth + startPosition > window.innerWidth ||
    startHeight + startPosition > window.innerHeight;
  const [fullscreen, setFullscreen] = useState(largerThanScreen ? true : false);
  const [width, setWidth] = useState(largerThanScreen ? minWidth : startWidth);
  const [height, setHeight] = useState(
    largerThanScreen ? minHeight : startHeight
  );
  const [iframeBlockDisplay, setIframeBlockDisplay] = useState("none");

  const [positionX, setPositionX] = useState(
    largerThanScreen ? 0.1 * window.innerWidth : startPosition
  );
  const [positionY, setPositionY] = useState(
    largerThanScreen ? 0.1 * window.innerHeight : startPosition
  );

  const [startClick, setStartClick] = useState({ x: 0, y: 0 });
  const [startWH, setStartWH] = useState({ width: 0, height: 0 });
  const [startXY, setStartXY] = useState({ x: 0, y: 0 });

  const [resizeDirection, setResizeDirection] = useState("resizeRightTop");
  const [isDragging, setIsDragging] = useState(false);
  const [isBeingResized, setIsBeingResized] = useState(false);

  const close = (e) => {
    closeRunning(e, pid);
  };

  function blockIframe() {
    setIframeBlockDisplay("block");
  }

  function unblockIframe() {
    setIframeBlockDisplay("none");
  }

  function handleDragMouseClick(event) {
    document.body.style.userSelect = "none";
    if (!fullscreen) {
      changeOnTopRunning(pid);
      blockIframe();
      event.stopPropagation();
      setStartClick({ x: event.clientX, y: event.clientY });
      setIsDragging(true);
    }
  }

  function handleDragMouseMove(event) {
    setPositionX(positionX + event.clientX - startClick.x);
    setPositionY(positionY + event.clientY - startClick.y);
  }

  function handleDragMouseRelease(event) {
    document.body.style.userSelect = "";
    unblockIframe();
    setIsDragging(false);
    document.removeEventListener("pointermove", handleDragMouseMove);
    document.removeEventListener("pointerup", handleDragMouseRelease);
  }

  function handleResizeMouseClick(event) {
    document.body.style.userSelect = "none";
    const right = event.nativeEvent.offsetX > width - 10;
    const bottom = event.nativeEvent.offsetY > height + 40 - 10;
    const left = event.nativeEvent.offsetX < 10;
    const top = event.nativeEvent.offsetY < 10;

    if (!fullscreen) {
      setResizeDirection(
        "resize" +
          (right ? "Right" : "") +
          (left ? "Left" : "") +
          (top ? "Top" : "") +
          (bottom ? "Bottom" : "")
      );

      blockIframe();
      setStartClick({ x: event.clientX, y: event.clientY });
      setStartWH({ width: width, height: height });
      setStartXY({ x: positionX, y: positionY });
      setIsBeingResized(true);
    }
  }

  const resizeTop = (event) => {
    const newHeight = height - event.clientY + startClick.y;
    if (newHeight > minHeight) {
      setHeight(newHeight);
      setPositionY(positionY + event.clientY - startClick.y);
    } else {
      setHeight(minHeight);
      setPositionY(startXY.y + startWH.height - minHeight);
    }
  };

  const resizeRight = (event) => {
    const newWidth = width + event.clientX - startClick.x;
    if (newWidth > minWidth) {
      setWidth(newWidth);
    } else setWidth(minWidth);
  };

  const resizeBottom = (event) => {
    const newHeight = height + event.clientY - startClick.y;
    if (newHeight > minHeight) {
      setHeight(newHeight);
    } else setHeight(minHeight);
  };

  const resizeLeft = (event) => {
    const newWidth = width - event.clientX + startClick.x;
    if (newWidth > minWidth) {
      setWidth(newWidth);
      setPositionX(positionX + event.clientX - startClick.x);
    } else {
      setWidth(minWidth);
      setPositionX(startXY.x + startWH.width - minWidth);
    }
  };

  const resizeRightBottom = (event) => {
    resizeRight(event);
    resizeBottom(event);
  };

  const resizeRightTop = (event) => {
    resizeRight(event);
    resizeTop(event);
  };

  const resizeLeftTop = (event) => {
    resizeLeft(event);
    resizeTop(event);
  };

  const resizeLeftBottom = (event) => {
    resizeLeft(event);
    resizeBottom(event);
  };

  const resize = {
    resizeBottom,
    resizeLeft,
    resizeRight,
    resizeTop,
    resizeLeftBottom,
    resizeRightBottom,
    resizeLeftTop,
    resizeRightTop,
  };

  function handleResizeMouseMove(event) {
    resize[resizeDirection](event);
  }

  function handleResizeMouseRelease(event) {
    document.body.style.userSelect = "";
    unblockIframe();
    setIsBeingResized(false);
    document.removeEventListener("pointermove", handleResizeMouseMove);
    document.removeEventListener("pointerup", handleResizeMouseRelease);
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("pointermove", handleDragMouseMove);
      document.addEventListener("pointerup", handleDragMouseRelease);
    }
  }, [isDragging]);

  useEffect(() => {
    if (isBeingResized) {
      document.addEventListener("pointermove", handleResizeMouseMove);
      document.addEventListener("pointerup", handleResizeMouseRelease);
    }
  }, [isBeingResized]);

  return (
    <div>
      <div
        id="window"
        className={"window" + pid}
        onClick={() => {
          changeOnTopRunning(pid);
        }}
        onPointerDown={handleResizeMouseClick}
        style={{
          position: "absolute",
          width: fullscreen
            ? "calc(100% - 20px)"
            : width + windowInnerPadding * 2,
          height: fullscreen
            ? "calc(100% - 80px)"
            : height + 40 + windowInnerPadding * 2,
          borderRadius: "10px",
          overflow: "hidden",
          zIndex: zIndex,
          top: fullscreen ? 5 : positionY,
          left: fullscreen ? 5 : positionX,
          padding: windowInnerPadding,
          backgroundColor: "grey",
          cursor: "pointer",
          opacity: onTop ? 1 : 0.7,
        }}
      >
        <div style={{ padding: 0, cursor: "default", borderRadius: "15px" }}>
          <div
            id="topBar"
            onPointerDown={handleDragMouseClick}
            style={{
              width: "100%",
              height: "40px",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
              backgroundColor: "dodgerblue",
            }}
          >
            <div
              style={{
                top: windowInnerPadding,
                margin: "10px",
                position: "absolute",
                color: "white",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <img
                src={icon}
                width="30px"
                style={{
                  position: "relative",
                  marginRight: "10px",
                  top: "-5px",
                }}
                alt="icon"
              />
              <div>{name}</div>
            </div>
          </div>
          <div
            style={{
              top: windowInnerPadding,
              right: windowInnerPadding,
              margin: "10px",
              position: "absolute",
              width: "20px",
              height: "20px",
              backgroundColor: "red",
              borderRadius: "15px",
            }}
            onClick={close}
            onPointerDown={(e) => {
              e.stopPropagation();
            }}
          ></div>
          <div
            style={{
              top: windowInnerPadding,
              right: windowInnerPadding + 25,
              margin: "10px",
              position: "absolute",
              width: "20px",
              height: "20px",
              backgroundColor: "#39FF14",
              borderRadius: "15px",
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
            onClick={(e) => {
              setFullscreen(!fullscreen);
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
            }}
          >
            <div style={{ opacity: 0.4 }}>{fullscreen ? "-" : "+"}</div>
          </div>
          <div
            onPointerDown={(event) => {
              event.stopPropagation();
            }}
            style={{
              position: "absolute",
              top: 40 + windowInnerPadding,
              bottom: windowInnerPadding,
              left: windowInnerPadding,
              right: windowInnerPadding,
              borderBottomLeftRadius: "10px",
              borderBottomRightRadius: "10px",
              display: "flex",
              overflow: "hidden",
            }}
          >
            <Component
              {...programProps}
              onTop={onTop}
              width={width}
              height={height}
              close={close}
            />
          </div>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          display: iframeBlockDisplay,
          zIndex: 2147483647,
        }}
      ></div>
    </div>
  );
}

export default Window;

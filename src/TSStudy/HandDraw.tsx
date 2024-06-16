import React, { useRef, useState, useEffect } from 'react';
import './HandDraw.css';

function HandDraw() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);;
    const [isDrawing, setIsDrawing] = useState(false);
    const [color, setColor] = useState('#000000');
    const [lineWidth, setLineWidth] = useState(5);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const context = canvas.getContext('2d');
            if (context) {
                context.lineJoin = 'round';
                context.lineCap = 'round';
            }
        }
    }, []);

    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const { offsetX, offsetY } = e.nativeEvent;
        const canvas = canvasRef.current;
        if (canvas) {
            const context = canvas.getContext('2d');
            if (context) {
                context.beginPath();
                context.moveTo(offsetX, offsetY);
                setIsDrawing(true);
            }
        }
    };

    const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing) return;
        const { offsetX, offsetY } = e.nativeEvent;
        const canvas = canvasRef.current;
        if (canvas) {

            const context = canvas.getContext('2d');
            if (context) {
                context.strokeStyle = color;
                context.lineWidth = lineWidth;
                context.lineTo(offsetX, offsetY);
                context.stroke();
            }
        }
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const context = canvas.getContext('2d');
            if (context) {
                context.clearRect(0, 0, canvas.width, canvas.height);
            }
        };
    }

    return (
        <div className="HandDraw">
            <h4>React Drawing Canvas</h4>
            <div className="controls">
                <label>
                    Color:
                    <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
                </label>
                <label>
                    Line Width:
                    <input
                        type="number"
                        value={lineWidth}
                        onChange={(e) => setLineWidth(parseInt(e.target.value, 10))}
                        min="1"
                        max="50"
                    />
                </label>
                <button onClick={clearCanvas}>Clear Canvas</button>
            </div>
            <p>マウスでお絵かき</p>
            <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                className="canvas"
            />
        </div>
    );
}

export default HandDraw;

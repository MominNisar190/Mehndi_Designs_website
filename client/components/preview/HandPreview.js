'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, RotateCcw, ZoomIn, ZoomOut, Download, Move } from 'lucide-react';
import Image from 'next/image';

export default function HandPreview({ design, onClose }) {
  const canvasRef = useRef(null);
  const [handImage, setHandImage] = useState(null);
  const [designImage, setDesignImage] = useState(null);
  const [overlay, setOverlay] = useState({ x: 50, y: 50, scale: 1, rotation: 0, opacity: 0.75 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const fileInputRef = useRef(null);

  const primaryImage = design.images?.find((img) => img.isPrimary) || design.images?.[0];

  // Load design image
  useEffect(() => {
    if (!primaryImage?.url) return;
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => setDesignImage(img);
    img.src = primaryImage.url;
  }, [primaryImage]);

  // Draw canvas
  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !handImage) return;

    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;

    ctx.clearRect(0, 0, width, height);

    // Draw hand image
    ctx.drawImage(handImage, 0, 0, width, height);

    // Draw design overlay
    if (designImage) {
      ctx.save();
      ctx.globalAlpha = overlay.opacity;

      const dw = (width * 0.5) * overlay.scale;
      const dh = (height * 0.5) * overlay.scale;
      const dx = (overlay.x / 100) * width - dw / 2;
      const dy = (overlay.y / 100) * height - dh / 2;

      ctx.translate(dx + dw / 2, dy + dh / 2);
      ctx.rotate((overlay.rotation * Math.PI) / 180);
      ctx.drawImage(designImage, -dw / 2, -dh / 2, dw, dh);
      ctx.restore();
    }
  }, [handImage, designImage, overlay]);

  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new window.Image();
      img.onload = () => {
        setHandImage(img);
        // Set canvas size to match image aspect ratio
        const canvas = canvasRef.current;
        if (canvas) {
          const maxW = 500;
          const ratio = img.height / img.width;
          canvas.width = maxW;
          canvas.height = maxW * ratio;
        }
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleMouseDown = (e) => {
    if (!handImage) return;
    setIsDragging(true);
    const rect = canvasRef.current.getBoundingClientRect();
    setDragStart({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      ox: overlay.x,
      oy: overlay.y,
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const dx = ((e.clientX - rect.left - dragStart.x) / rect.width) * 100;
    const dy = ((e.clientY - rect.top - dragStart.y) / rect.height) * 100;
    setOverlay((o) => ({
      ...o,
      x: Math.max(0, Math.min(100, dragStart.ox + dx)),
      y: Math.max(0, Math.min(100, dragStart.oy + dy)),
    }));
  };

  const handleMouseUp = () => setIsDragging(false);

  const downloadResult = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `${design.title}-preview.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const resetOverlay = () => {
    setOverlay({ x: 50, y: 50, scale: 1, rotation: 0, opacity: 0.75 });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-[#141414] border border-[#2a2a2a] rounded-sm w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-[#2a2a2a]">
            <h2 className="font-serif text-xl text-white">Try Design on Hand</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Canvas */}
            <div>
              {!handImage ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="aspect-square border-2 border-dashed border-[#2a2a2a] hover:border-gold-500/50 rounded-sm flex flex-col items-center justify-center gap-4 cursor-pointer transition-colors group"
                >
                  <Upload size={32} className="text-gray-600 group-hover:text-gold-500 transition-colors" />
                  <div className="text-center">
                    <p className="text-gray-400 text-sm">Upload your hand photo</p>
                    <p className="text-gray-600 text-xs mt-1">JPG, PNG up to 5MB</p>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <canvas
                    ref={canvasRef}
                    className="w-full rounded-sm cursor-move"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button
                      onClick={() => { setHandImage(null); fileInputRef.current?.click(); }}
                      className="w-8 h-8 bg-black/60 rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-colors"
                      title="Change photo"
                    >
                      <Upload size={12} />
                    </button>
                  </div>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            {/* Controls */}
            <div className="space-y-6">
              {/* Design preview */}
              <div className="flex items-center gap-4 p-4 bg-[#1a1a1a] rounded-sm">
                <div className="relative w-16 h-16 rounded-sm overflow-hidden shrink-0">
                  <Image
                    src={primaryImage?.url || '/placeholder-design.jpg'}
                    alt={design.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{design.title}</p>
                  <p className="text-gray-500 text-xs">Drag on canvas to reposition</p>
                </div>
              </div>

              {/* Scale */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs text-gray-400 uppercase tracking-wider">Size</label>
                  <span className="text-gold-500 text-xs">{Math.round(overlay.scale * 100)}%</span>
                </div>
                <div className="flex items-center gap-3">
                  <ZoomOut size={14} className="text-gray-500" />
                  <input
                    type="range"
                    min="0.2"
                    max="3"
                    step="0.05"
                    value={overlay.scale}
                    onChange={(e) => setOverlay((o) => ({ ...o, scale: parseFloat(e.target.value) }))}
                    className="flex-1 accent-gold-500"
                  />
                  <ZoomIn size={14} className="text-gray-500" />
                </div>
              </div>

              {/* Rotation */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs text-gray-400 uppercase tracking-wider">Rotation</label>
                  <span className="text-gold-500 text-xs">{overlay.rotation}°</span>
                </div>
                <input
                  type="range"
                  min="-180"
                  max="180"
                  step="1"
                  value={overlay.rotation}
                  onChange={(e) => setOverlay((o) => ({ ...o, rotation: parseInt(e.target.value) }))}
                  className="w-full accent-gold-500"
                />
              </div>

              {/* Opacity */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs text-gray-400 uppercase tracking-wider">Opacity</label>
                  <span className="text-gold-500 text-xs">{Math.round(overlay.opacity * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.05"
                  value={overlay.opacity}
                  onChange={(e) => setOverlay((o) => ({ ...o, opacity: parseFloat(e.target.value) }))}
                  className="w-full accent-gold-500"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button onClick={resetOverlay} className="btn-outline flex items-center gap-2 flex-1 text-sm py-2">
                  <RotateCcw size={14} /> Reset
                </button>
                {handImage && (
                  <button onClick={downloadResult} className="btn-gold flex items-center gap-2 flex-1 text-sm py-2">
                    <Download size={14} /> Save
                  </button>
                )}
              </div>

              <p className="text-gray-600 text-xs text-center">
                💡 Tip: Drag the design on the canvas to reposition it
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

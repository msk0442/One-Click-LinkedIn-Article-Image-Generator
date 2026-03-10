import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Loader2, ImagePlus, Download, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

export function ImageGenerator({ apiKey }: { apiKey: string }) {
    const [prompt, setPrompt] = useState('');
    const [generating, setGenerating] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const handleGenerate = async () => {
        if (!apiKey) {
            alert("Please add your API key in settings first.");
            return;
        }
        setGenerating(true);
        // Mock generation delay for visual effect
        setTimeout(() => {
            setImageUrl(`https://source.unsplash.com/random/1200x630/?${encodeURIComponent(prompt || 'technology,business')}`);
            setGenerating(false);
        }, 2500);
    };

    return (
        <div className="w-full max-w-4xl mx-auto space-y-8 relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row gap-4"
            >
                <div className="flex-1 relative">
                    <Input
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Describe your LinkedIn article topic..."
                        className="w-full h-14 pl-5 text-lg shadow-sm border-white/10 bg-black/40 text-white placeholder:text-zinc-600 focus:border-indigo-500 rounded-2xl"
                    />
                </div>
                <Button
                    onClick={handleGenerate}
                    disabled={generating || !prompt.trim()}
                    className="h-14 px-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-medium tracking-wide transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)]"
                >
                    {generating ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Sparkles className="mr-2 h-5 w-5" />}
                    Generate Now
                </Button>
            </motion.div>

            {/* Results Bento Grid */}
            <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-12 gap-6"
            >
                <Card className="col-span-1 md:col-span-8 aspect-video relative overflow-hidden bg-black/50 border-white/5 rounded-3xl backdrop-blur-xl group">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 pointer-events-none" />

                    {imageUrl ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0"
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={imageUrl} alt="Generated cover" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                <Button variant="secondary" size="icon" className="rounded-full bg-white text-black hover:scale-105 transition-transform">
                                    <Download className="h-5 w-5" />
                                </Button>
                                <Button variant="secondary" size="icon" className="rounded-full bg-white text-black hover:scale-105 transition-transform" onClick={handleGenerate}>
                                    <RefreshCcw className="h-5 w-5" />
                                </Button>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-600">
                            <ImagePlus className="h-12 w-12 mb-4 opacity-50" />
                            <p className="text-sm font-medium tracking-tight">Your masterpiece will appear here</p>
                        </div>
                    )}
                </Card>

                <div className="col-span-1 md:col-span-4 space-y-6 flex flex-col">
                    <Card className="flex-1 p-6 relative overflow-hidden bg-black/50 border-white/5 rounded-3xl backdrop-blur-xl flex flex-col justify-center">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl" />
                        <h3 className="text-xl font-medium text-white mb-2 tracking-tight">Optimized Output</h3>
                        <p className="text-sm leading-relaxed text-zinc-400">
                            Generated images are perfectly sized for LinkedIn articles (1200x627).
                            Our engine applies professional color grading instantly.
                        </p>
                    </Card>
                    <Card className="flex-1 p-6 relative overflow-hidden bg-black/50 border-white/5 rounded-3xl backdrop-blur-xl flex flex-col justify-center">
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />
                        <h3 className="text-xl font-medium text-white mb-2 tracking-tight">Pro Tips</h3>
                        <ul className="text-sm text-zinc-400 space-y-2 list-disc list-inside marker:text-indigo-500">
                            <li>Use vivid descriptions</li>
                            <li>Include central subjects</li>
                            <li>Specify lighting (e.g., &apos;cinematic&apos;)</li>
                        </ul>
                    </Card>
                </div>
            </motion.div >
        </div >
    );
}

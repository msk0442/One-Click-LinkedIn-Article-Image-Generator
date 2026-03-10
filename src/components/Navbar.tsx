import { motion } from 'framer-motion';
import { Layers, Settings2, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navbar({ onOpenSettings }: { onOpenSettings: () => void }) {
    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="sticky top-0 z-40 w-full backdrop-blur-3xl bg-black/60 border-b border-white/5"
        >
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 shadow-[0_0_20px_rgba(99,102,241,0.5)]">
                        <Layers className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-semibold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
                        One-Click Gen.
                    </span>
                </div>

                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => window.open('https://github.com/msk0442/One-Click-LinkedIn-Article-Image-Generator', '_blank')} className="hidden sm:flex text-zinc-400 hover:text-white rounded-full">
                        <Github className="h-4 w-4" />
                    </Button>
                    <Button
                        onClick={onOpenSettings}
                        variant="outline"
                        className="rounded-full bg-white/5 border-white/10 text-zinc-300 hover:bg-white/10 hover:text-white transition-all shadow-sm"
                    >
                        <Settings2 className="mr-2 h-4 w-4" />
                        <span className="text-sm font-medium">Settings</span>
                    </Button>
                </div>
            </div>
        </motion.nav>
    );
}

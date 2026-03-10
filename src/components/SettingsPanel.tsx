import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { KeyRound, Check, X, ShieldAlert } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function SettingsPanel({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [apiKey, setApiKey] = useLocalStorage<string>('ai_api_key', '');
    const [tempKey, setTempKey] = useState(apiKey);
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        setApiKey(tempKey);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 z-50 m-auto h-fit w-full max-w-md rounded-2xl border border-white/10 bg-black/50 p-6 shadow-2xl shadow-indigo-500/10 backdrop-blur-xl sm:w-[400px]"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2 text-white">
                                <KeyRound className="h-5 w-5 text-indigo-400" />
                                <h2 className="text-xl font-semibold tracking-tight">API Settings</h2>
                            </div>
                            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full text-zinc-400 hover:text-white">
                                <X className="h-4 w-4" />
                            </Button>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="api-key" className="text-zinc-300">OpenAI API Key</Label>
                                <Input
                                    id="api-key"
                                    type="password"
                                    value={tempKey}
                                    onChange={(e) => setTempKey(e.target.value)}
                                    placeholder="sk-..."
                                    className="bg-black/50 border-white/10 focus:border-indigo-500 text-white placeholder:text-zinc-600"
                                />
                            </div>

                            <div className="flex items-start gap-3 rounded-xl bg-indigo-500/10 p-4 border border-indigo-500/20">
                                <ShieldAlert className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
                                <p className="text-xs leading-relaxed text-zinc-300">
                                    Your API keys are securely stored in your browser&apos;s local storage. They are never sent to our servers. Bring Your Own Key (BYOK) ensures maximum privacy.
                                </p>
                            </div>

                            <Button
                                onClick={handleSave}
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white transition-all"
                            >
                                {saved ? <Check className="mr-2 h-4 w-4" /> : null}
                                {saved ? 'Saved Successfully' : 'Save Key'}
                            </Button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

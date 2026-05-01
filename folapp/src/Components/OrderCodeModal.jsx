import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from '@phosphor-icons/react';
import { supabase } from '../Supabase.jsx';
import { useNavigate } from 'react-router-dom';
import './OrderCodeModal.css';

const OrderCodeModal = ({ isOpen, onClose }) => {
    const [orderCode, setOrderCode] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // The current logged-in user ID (hardcoded to 1 as per current app logic)
    const currentUserId = 1;

    const handleRedeem = async () => {
        if (!orderCode.trim()) {
            setErrorMsg('يرجى كتابة كود الطلب');
            return;
        }

        setIsLoading(true);
        setErrorMsg('');

        try {
            // 1. Search & Verify in Orders table
            const { data: orderData, error: orderError } = await supabase
                .from('Orders')
                .select('id')
                .eq('order_code', orderCode.trim())
                .eq('is_redeemed', false)
                .single();

            if (orderError || !orderData) {
                setErrorMsg('كود غير صحيح أو تم استخدامه مسبقاً');
                setIsLoading(false);
                return;
            }

            const orderId = orderData.id;

            // 2. Retrieve Item from Order_Items
            // Get items for this order that have a Plant_Link_ID
            const { data: orderItems, error: itemsError } = await supabase
                .from('Order_Items')
                .select('Plant_Link_ID')
                .eq('Order_id', orderId)
                .not('Plant_Link_ID', 'is', null)
                .limit(1);

            if (itemsError || !orderItems || orderItems.length === 0) {
                setErrorMsg('لا يحتوي هذا الطلب على نباتات');
                setIsLoading(false);
                return;
            }

            const plantLinkId = orderItems[0].Plant_Link_ID;

            // 3. Insert Plant into User_Plants
            const { error: insertError } = await supabase
                .from('User_Plants')
                .insert([
                    {
                        User: currentUserId,
                        Plant: plantLinkId,
                        Added_Method: 'Order Code',
                        "Health_Status(AR)": 'صحي',
                        Nickname: 'نباتي الجديد' // Generic fallback, user can edit later
                    }
                ]);

            if (insertError) {
                console.error("Error inserting plant:", insertError);
                setErrorMsg('حدث خطأ أثناء إضافة النبات. يرجى المحاولة مرة أخرى.');
                setIsLoading(false);
                return;
            }

            // 4. Lock Code in Orders
            const { error: updateError } = await supabase
                .from('Orders')
                .update({ is_redeemed: true })
                .eq('id', orderId);

            if (updateError) {
                console.error("Error updating order status:", updateError);
            }

            // Success! Close modal and navigate to MyPlants
            setIsLoading(false);
            onClose();
            navigate('/MyPlants'); // Assuming the user should see their new plant

        } catch (error) {
            console.error("Unexpected error:", error);
            setErrorMsg('حدث خطأ غير متوقع.');
            setIsLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="modalOverlay">
                    <motion.div
                        className="modalBackdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    <div className="modalWrapper">
                        <motion.div 
                            className="closeIconWrapper"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            onClick={onClose}
                        >
                            <X size={42} color="#FAFAEA" weight="light" />
                        </motion.div>

                        <motion.div
                            className="orderCodeModal"
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        >
                            <h3 className="modalTitle">أضف كود الطلب</h3>

                            <div className="inputContainer">
                                <input
                                    type="text"
                                    className="orderCodeInput"
                                    placeholder="اكتبه هنا..."
                                    value={orderCode}
                                    onChange={(e) => setOrderCode(e.target.value)}
                                    disabled={isLoading}
                                />
                            </div>

                            {errorMsg && (
                                <p className="errorText">{errorMsg}</p>
                            )}

                            <div className="modalActions">
                                <button 
                                    className="confirmBtn" 
                                    onClick={handleRedeem}
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'جاري التحقق...' : 'تم'}
                                </button>
                                <button 
                                    className="cancelBtn" 
                                    onClick={onClose}
                                    disabled={isLoading}
                                >
                                    إلغاء
                                </button>

                            </div>
                        </motion.div>
                    </div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default OrderCodeModal;

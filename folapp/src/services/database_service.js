import { supabase } from '../Supabase.jsx';

/**
 * Fetches chat history for a specific session and service.
 */
export const fetchChatHistory = async (sessionId, serviceId) => {
  const { data, error } = await supabase
    .from('ai_messages')
    .select('*')
    .eq('session_id', sessionId)
    .eq('service_id', serviceId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching chat history:', error);
    return [];
  }
  return data;
};

/**
 * Saves a new message to the chat history.
 */
export const saveMessage = async (sessionId, serviceId, content, senderType) => {
  const { data, error } = await supabase
    .from('ai_messages')
    .insert([
      {
        session_id: sessionId,
        service_id: serviceId,
        content: content,
        sender_type: senderType, // 'user' or 'ai'
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Error saving message:', error);
    throw error;
  }
  return data;
};

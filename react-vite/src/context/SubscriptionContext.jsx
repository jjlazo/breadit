import { createContext, useState } from 'react';

export const SubscriptionContext = createContext();

export const SubscriptionProvider = ({ children }) => {
    const [isSubscribed, setIsSubscribed] = useState(false)

    return (
      <SubscriptionContext.Provider value={{ isSubscribed, setIsSubscribed }}>
        {children}
      </SubscriptionContext.Provider>
    );
  };
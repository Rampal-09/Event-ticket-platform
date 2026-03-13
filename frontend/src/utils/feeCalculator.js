/**
 * Fee calculation utility — centralised so frontend and any
 * server-side display logic stay in sync.
 *
 * Model:
 *   Free events (ticketPrice === 0) → $0 fee
 *   Paid events → 1.5% of ticket price + $0.30 fixed per ticket
 */

/**
 * Calculate the processing fee for a single ticket.
 * @param {number} ticketPrice – price of one ticket
 * @returns {number} fee for one ticket (2 decimal places)
 */
export const calcFeePerTicket = (ticketPrice) => {
    if (!ticketPrice || ticketPrice <= 0) return 0;
    return parseFloat(((ticketPrice * 0.015) + 0.30).toFixed(2));
};

/**
 * Full breakdown for checkout.
 * @param {number} ticketPrice
 * @param {number} quantity
 * @param {object|null} discount  – { discountType, value, code }
 * @returns {{ subtotal, feePerTicket, totalFee, discountAmount, total, isFree }}
 */
export const calcCheckoutBreakdown = (ticketPrice, quantity, discount = null) => {
    const isFree = !ticketPrice || ticketPrice <= 0;
    const subtotal = (ticketPrice || 0) * quantity;

    const feePerTicket = calcFeePerTicket(ticketPrice);
    const totalFee = isFree ? 0 : parseFloat((feePerTicket * quantity).toFixed(2));

    let discountAmount = 0;
    if (discount && !isFree) {
        if (discount.discountType === 'percentage') {
            discountAmount = parseFloat(((subtotal * discount.value) / 100).toFixed(2));
        } else {
            discountAmount = parseFloat((discount.value).toFixed(2));
        }
    }

    const total = parseFloat((subtotal + totalFee - discountAmount).toFixed(2));

    return { subtotal, feePerTicket, totalFee, discountAmount, total, isFree };
};

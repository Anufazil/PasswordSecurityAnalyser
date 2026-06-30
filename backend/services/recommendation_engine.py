def generate_recommendations(result):

    recommendations = []

    if result["is_common"]:
        recommendations.append(
            "Avoid using common passwords."
        )

    if result["breached"]:
        recommendations.append(
            "This password has appeared in public data breaches. Replace it immediately."
        )

    if result["keyboard_pattern"]:
        recommendations.append(
            "Avoid keyboard patterns like qwerty or asdf."
        )

    if result["sequence_pattern"]:
        recommendations.append(
            "Avoid sequential characters such as 1234 or abcd."
        )

    if result["repeated_pattern"]:
        recommendations.append(
            "Repeated characters reduce password strength."
        )

    if result["dictionary_pattern"]:
        recommendations.append(
            "Avoid dictionary words."
        )

    if result["checks"]["length"] is False:
        recommendations.append(
            "Increase the password length to at least 12 characters."
        )

    if result["checks"]["symbols"] is False:
        recommendations.append(
            "Include special characters."
        )

    if result["checks"]["uppercase"] is False:
        recommendations.append(
            "Add uppercase letters."
        )

    if result["checks"]["numbers"] is False:
        recommendations.append(
            "Include numbers."
        )

    if not recommendations:
        recommendations.append(
            "Excellent! Your password follows current security best practices."
        )

    return recommendations